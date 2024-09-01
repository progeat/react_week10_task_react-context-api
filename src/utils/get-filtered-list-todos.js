export const getFilteredListTodos = (todos, isSortFlag, debouncedValue) => {
	let filteredListTodos = [];

	if (isSortFlag) {
		filteredListTodos = [...todos].sort((a, b) => (a.title > b.title ? 1 : -1));
	} else {
		filteredListTodos = todos;
	}

	if (debouncedValue)
		filteredListTodos = [...filteredListTodos].filter((todo) =>
			todo.title.toLowerCase().includes(debouncedValue.toLowerCase()),
		);

	return filteredListTodos;
};
