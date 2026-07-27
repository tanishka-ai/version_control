import { NotFound } from "@/components/common/NotFound";

export default function PageNotFound() {
  return (
    <NotFound
      title="Page not found"
      message="The page you're looking for doesn't exist. Check the URL or head back home."
    />
  );
}
