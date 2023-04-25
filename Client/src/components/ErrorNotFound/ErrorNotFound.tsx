interface ErrorNotFoundType {
  from: string;
}

export default function ErrorNotFound({
  from,
}: ErrorNotFoundType): JSX.Element {
  const hash = {
    card: <p>Not avivable Game</p>,
  };

  return hash[from];
}
