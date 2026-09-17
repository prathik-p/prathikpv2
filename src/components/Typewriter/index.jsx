import { useEffect, useState } from "react";
import "./index.scss";

const lines = ["I build what you see.", "And what makes it work."];

const totalCharacters = lines.join("").length;

// eslint-disable-next-line react/prop-types -- Both flags are booleans owned by HomePage.
function Typewriter({ paused, reducedMotion }) {
  const [revealed, setRevealed] = useState(0);
  const visibleCharacters = reducedMotion ? totalCharacters : revealed;

  useEffect(() => {
    if (paused || reducedMotion || revealed >= totalCharacters) return;
    const delay = revealed === 0 ? 350 : revealed === lines[0].length ? 505 : 55;
    const timer = window.setTimeout(() => setRevealed((count) => count + 1), delay);
    return () => window.clearTimeout(timer);
  }, [paused, reducedMotion, revealed]);

  let characterIndex = 0;

  return (
    <p className="hero-typewriter">
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span className="typewriter-line" key={line}>
            {line.split(" ").map((word, wordIndex, words) => (
              <span className="typewriter-word" key={`${lineIndex}-${wordIndex}`}>
                {[...word, ...(wordIndex < words.length - 1 ? [" "] : [])].map((character, index) => {
                  const position = characterIndex++;
                  return (
                    <span
                      className="typewriter-character"
                      key={index}
                      data-visible={position < visibleCharacters}
                      data-cursor={!reducedMotion && position === visibleCharacters - 1}
                      data-complete={visibleCharacters === totalCharacters}
                    >{character}</span>
                  );
                })}
              </span>
            ))}
          </span>
        ))}
      </span>
    </p>
  );
}

export default Typewriter;
