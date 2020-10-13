<script>
	export let name;

	let submitted = false;

	function handleClick() {
		submitted = true;
	}

	let input = '';
</script>

<main>
	<h1>Custom Element Demo</h1>
	<simple-greeting name={name}></simple-greeting>
	{#if submitted}
		<p>Successfully submitted!</p>
	{/if}
	<custom-text-input on:input={(e) => input = e.target.value} label="Name"></custom-text-input>
	<p>You typed: {input}</p>
	<custom-button disabled={submitted} on:click={handleClick}>Submit</custom-button>
</main>
