import { useToast } from "@/hooks/use-toast";

export default function ExampleComponent() {
  const { toast, dismiss } = useToast();

  const handleClick = () => {
    toast({ title: "Success!", description: "This is a toast message.", variant: "success" });
  };

  return (
    <div>
      <button onClick={handleClick}>Show Toast</button>
    </div>
  );
}
