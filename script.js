
        const searchInputEl = document.getElementById('searchInput');
        const searchResultsEl = document.getElementById('searchResults');
        const spinnerEl = document.getElementById('spinner');

        function createAndAppendSearchResult(result) {
            const {
                link,
                title,
                description
            } = result;

            const resultItemEl = document.createElement('div');
            resultItemEl.className = 'result-item';

            const titleEl = document.createElement('a');
            titleEl.href = link;
            titleEl.target = '_blank';
            titleEl.textContent = title;
            titleEl.className = 'result-title';

            const urlEl = document.createElement('a');
            urlEl.href = link;
            urlEl.target = '_blank';
            urlEl.textContent = link;
            urlEl.className = 'result-url';

            const descriptionEl = document.createElement('p');
            descriptionEl.className = 'link-description';
            descriptionEl.textContent = description;

            resultItemEl.appendChild(titleEl);
            resultItemEl.appendChild(urlEl);
            resultItemEl.appendChild(descriptionEl);

            searchResultsEl.appendChild(resultItemEl);
        }

        function displayResults(searchResults) {
            spinnerEl.classList.add('d-none');
            searchResultsEl.textContent = '';

            if (!searchResults || searchResults.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'text-center mt-4 text-secondary';
                noResults.innerHTML = "<span class='material-icons' style='font-size:2rem;vertical-align:-7px;'>psychology_alt</span><br>Nothing found, try a new keyword!";
                searchResultsEl.appendChild(noResults);
                return;
            }

            searchResults.forEach(createAndAppendSearchResult);
        }

        function searchWikipedia(event) {
            if (event.key === 'Enter' && searchInputEl.value.trim() !== '') {
                spinnerEl.classList.remove('d-none');
                searchResultsEl.textContent = '';

                const query = encodeURIComponent(searchInputEl.value.trim());
                const url = `https://apis.ccbp.in/wiki-search?search=${query}`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => displayResults(data.search_results))
                    .catch(() => {
                        spinnerEl.classList.add('d-none');
                        searchResultsEl.textContent = '';
                        const errorEl = document.createElement('div');
                        errorEl.className = 'text-center mt-4 text-danger';
                        errorEl.innerHTML = "<span class='material-icons' style='font-size:2rem;vertical-align:-7px;'>error_outline</span><br>Something went wrong. Please try again.";
                        searchResultsEl.appendChild(errorEl);
                    });
            }
        }

        searchInputEl.addEventListener('keydown', searchWikipedia);