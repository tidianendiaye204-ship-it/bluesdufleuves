import React from 'react';

interface LazyYoutubeProps {
  videoId: string;
  title: string;
}

/**
 * Composant YouTube optimisé
 * N'utilise pas le script lourd de YouTube immédiatement.
 * Charge seulement la miniature (thumbnail) et injecte l'iframe au clic.
 */
export const LazyYoutube: React.FC<LazyYoutubeProps> = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
      {!isLoaded ? (
        <button
          onClick={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full flex items-center justify-center group"
          aria-label={`Lire la vidéo: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Bouton Play YouTube */}
          <div className="absolute w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-glow">
            <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
};

interface LazySpotifyProps {
  episodeId: string;
}

/**
 * Composant Spotify optimisé
 * Utilise loading="lazy" pour ne pas bloquer le rendu de la page.
 */
export const LazySpotify: React.FC<LazySpotifyProps> = ({ episodeId }) => {
  return (
    <div className="w-full h-[152px] rounded-xl overflow-hidden">
      <iframe 
        src={`https://open.spotify.com/embed/track/${episodeId}?utm_source=generator&theme=0`}
        width="100%" 
        height="152" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        style={{ borderRadius: '12px', border: 'none' }}
      ></iframe>
    </div>
  );
};
