import { useNavigate } from "react-router-dom";
import { subjects } from "@/config/subjects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OffTopicDialogProps {
  open: boolean;
  onClose: () => void;
  detectedSubject: string;
  currentSubject: string;
}

const OffTopicDialog = ({ open, onClose, detectedSubject, currentSubject }: OffTopicDialogProps) => {
  const navigate = useNavigate();

  const matchedSubject = subjects.find(
    (s) => s.slug === detectedSubject || s.name.toLowerCase() === detectedSubject.toLowerCase()
  );

  const currentName = subjects.find((s) => s.slug === currentSubject)?.name || currentSubject;

  const handleSwitch = () => {
    if (matchedSubject) {
      onClose();
      navigate(`/chat/${matchedSubject.slug}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-[Space_Grotesk] text-lg flex items-center gap-2">
            🔀 Different Subject Detected
          </DialogTitle>
          <DialogDescription className="text-sm pt-2">
            Your question seems to be about{" "}
            <span className="font-semibold text-foreground">
              {matchedSubject?.name || detectedSubject}
            </span>
            . You're currently studying{" "}
            <span className="font-semibold text-foreground">{currentName}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-2">
          {matchedSubject && (
            <Button
              onClick={handleSwitch}
              className="gap-2"
              style={{ backgroundColor: `hsl(${matchedSubject.accentHsl})` }}
            >
              <matchedSubject.icon className="h-4 w-4" />
              Switch to {matchedSubject.name}
            </Button>
          )}
          <Button variant="outline" onClick={onClose} className="gap-2">
            Stay in {currentName}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OffTopicDialog;
