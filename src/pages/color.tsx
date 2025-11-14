import { useEffect, useState } from "react";

export default function Color() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    });
  }, []);

  return (
    <div>
      <h6 color="">Count:{count}</h6>
    </div>
  );
}
