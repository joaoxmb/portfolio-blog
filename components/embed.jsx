export function Embed(props) {
  const {src} = props;
  return (
    <iframe src={src}></iframe>
  )
}