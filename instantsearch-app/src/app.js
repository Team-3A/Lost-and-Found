const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch('SVMGRGNR2W', 'dc57c78108ae1df9d0798377eb33c668');

const search = instantsearch({
  indexName: 'Lost.items',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
  
});


search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
<article>
  <img src=${ hit.location } alt=${ hit.type } />
  <div>
    <h1>${components.Highlight({hit, attribute: "type"})}</h1>
    <p>${components.Highlight({hit, attribute: "title"})}</p>
    <p>${components.Highlight({hit, attribute: "imageUrl"})}</p>
  </div>
</article>
`,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();

