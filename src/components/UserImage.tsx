import type { ReactNode } from "react";

type UserImageProps = {
  url: string;
  children: ReactNode;
};

function UserImage({ url, children }: UserImageProps) {
  if (url.length < 1) {
    return children;
  }

  return <img src={url} alt="" />;
}

export { UserImage };
