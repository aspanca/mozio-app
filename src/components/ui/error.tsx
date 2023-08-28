import { useNavigate } from 'react-router-dom';
import { Button } from './button';

export const Error = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h6 className="text-2xl font-semibold mb-4">
          Oops! Something went wrong!
        </h6>
        <Button onClick={goBack}>Back</Button>
      </div>
    </div>
  );
};
