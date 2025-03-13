
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for sensor configuration
const sensorFormSchema = z.object({
  name: z.string().min(1, { message: "Nazwa jest wymagana" }),
  connectionType: z.enum(["webhook", "api", "mqtt", "url"]),
  connectionValue: z.string().min(1, { message: "Wartość połączenia jest wymagana" }),
});

export type SensorFormValues = z.infer<typeof sensorFormSchema>;

interface AddSensorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SensorFormValues) => void;
}

export function AddSensorDialog({ isOpen, onOpenChange, onSubmit }: AddSensorDialogProps) {
  const form = useForm<SensorFormValues>({
    resolver: zodResolver(sensorFormSchema),
    defaultValues: {
      name: "",
      connectionType: "webhook",
      connectionValue: "",
    },
  });

  const handleSubmit = (data: SensorFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] z-[9999]">
        <DialogHeader>
          <DialogTitle>Dodaj nowy czujnik</DialogTitle>
          <DialogDescription>
            Wprowadź dane potrzebne do połączenia z czujnikiem jakości powietrza.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa czujnika</FormLabel>
                  <FormControl>
                    <Input placeholder="Mój czujnik" {...field} />
                  </FormControl>
                  <FormDescription>
                    Podaj nazwę, która pomoże Ci zidentyfikować ten czujnik.
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="connectionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ połączenia</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...field}
                    >
                      <option value="webhook">Webhook</option>
                      <option value="api">Klucz API</option>
                      <option value="mqtt">MQTT</option>
                      <option value="url">URL with token</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    Wybierz metodę, za pomocą której będziesz łączyć się z czujnikiem.
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="connectionValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch("connectionType") === "webhook" ? "Webhook URL" : 
                     form.watch("connectionType") === "api" ? "Klucz API" : 
                     form.watch("connectionType") === "mqtt" ? "MQTT Endpoint" : 
                     "URL z tokenem"}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={
                        form.watch("connectionType") === "webhook" ? "https://example.com/webhook" : 
                        form.watch("connectionType") === "api" ? "api_key_123456" : 
                        form.watch("connectionType") === "mqtt" ? "mqtt://broker:1883" : 
                        "https://example.com/api?token=123456"
                      } 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Anuluj
              </Button>
              <Button type="submit">Dodaj czujnik</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
