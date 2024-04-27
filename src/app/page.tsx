export default function Home () {
  return (
    <main className="max-w-md mx-auto">
      <h1>Hola</h1>
      <a href={'https://discord.com/oauth2/authorize?client_id=969376556763992104&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&scope=guilds+identify'}>Login</a>
    </main>
  )
}
