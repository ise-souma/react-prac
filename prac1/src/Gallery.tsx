export function Profile(){
  return (
    <img
      src = "https://i.imgur.com/MK3eW3Am.jpg"
      alt = "Katherine Johnson"
    />
  )
}

export default function Gallery(){
  return (
    <section>
      <h5>Amazing scientists</h5>
      <Profile />
      <Profile />
    </section>
  )
}