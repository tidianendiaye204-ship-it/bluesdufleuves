import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTranslation } from "react-i18next";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ title: string; slug: string; category: string }[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const handleOpenSearch = () => setOpen(true);
    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = (await res.json()) as { title: string; slug: string; category: string }[];
          setResults(data);
        }
      } catch (err) {
        console.error("Search error", err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate({ to: path });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder={t("nav.search_placeholder", "Rechercher...")}
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>

        {!query && (
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => handleSelect("/")}>
              <span>{t("nav.home")}</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/blues-du-fleuve")}>
              <span>{t("nav.festival")}</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/formations")}>
              <span>{t("nav.formations")}</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/contact")}>
              <span>{t("nav.contact")}</span>
            </CommandItem>
          </CommandGroup>
        )}

        {results.length > 0 && (
          <CommandGroup heading="Articles">
            {results.map((article) => (
              <CommandItem
                key={article.slug}
                onSelect={() => handleSelect(`/articles/${article.slug}`)}
              >
                <span>{article.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">{article.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
