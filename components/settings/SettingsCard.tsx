import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface SettingsCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const SettingsCard = ({ children, title, description }: SettingsCardProps) => {
  return (
    <Card>
      <CardHeader className="p-4">
        {title && description && (
          <>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </>
        )}
        {children}
      </CardHeader>
    </Card>
  );
};

export default SettingsCard;
