<script>
  let name = 'World';

  function handleClick() {
    alert(`Hello, ${name}!`);
  }
</script>

<h1>Hello {name}!</h1>
<button on:click={handleClick}>Say Hello</button>
