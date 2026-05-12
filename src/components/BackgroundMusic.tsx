import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.1; // Very low volume for subtle background
      audio.loop = true;
      audio.play().catch(() => {
        // Autoplay might be blocked, user can manually start
      });
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="none">
        {/* Placeholder for background music - replace with actual audio file */}
        <source src="/bgm/ambient-focus.mp3" type="audio/mpeg" />
        <source src="/bgm/ambient-focus.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMute}
          className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );
};

export default BackgroundMusic;