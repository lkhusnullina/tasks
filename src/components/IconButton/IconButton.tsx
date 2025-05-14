import Button from '../Button/Button';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  alt: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  className = '',
  ...props
}) => {
  return (
    <Button className={className} {...props}>
      <img src={icon} alt={alt} />
    </Button>
  );
};

export default IconButton
