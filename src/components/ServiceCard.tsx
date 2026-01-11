import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
}

const ServiceCard = ({ icon: Icon, title }: ServiceCardProps) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-md hover-lift cursor-default">
      <div className="flex flex-col items-center text-center">
        <Icon className="h-12 w-12 text-primary mb-4" strokeWidth={1.5} />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
    </div>
  );
};

export default ServiceCard;
