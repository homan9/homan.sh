import Image from "next/image";

const AVATAR_SIZE = 36;

type AvatarNameProps = {
  src?: string;
  name: string;
  id?: string;
  grayscale?: boolean;
};

export default function AvatarName({
  src,
  name,
  id,
  grayscale = false,
}: AvatarNameProps) {
  return (
    <>
      {src ? (
        <Image
          id={id}
          src={src}
          alt={name}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
            ...(grayscale
              ? { filter: "grayscale(1) contrast(1.1)" }
              : undefined),
          }}
        />
      ) : (
        <div
          id={id}
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: "50%",
            background: "#e4e4e7",
            flexShrink: 0,
          }}
        />
      )}
      <span
        style={{
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: "#111",
          flexShrink: 0,
        }}
      >
        {name}
      </span>
    </>
  );
}
