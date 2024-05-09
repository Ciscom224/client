import React from "react";

// C'est pour l'alerte des entrées dans l'authentification (identifiant,password etc)
export const SpanAlerte = (props) => {
    const message = props.message
    return(
        <div className="flex items-center p-1 mb-1 text-sm text-[#6b2121] rounded-lg bg-red-50 dark:bg-transparent " role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">{message} ! </span>
  </div>
</div>
    )
}

