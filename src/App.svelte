<script>
	export let name;

	let submitted = false;

	function handleClick() {
		submitted = true;
	}
</script>

<main>
	<h1>Custom Element Demo</h1>
	<simple-greeting name={name}></simple-greeting>
	{#if submitted}
		<p>Successfully submitted!</p>
	{/if}
	<custom-button disabled={submitted} on:click={handleClick}>Submit</custom-button>
</main>
