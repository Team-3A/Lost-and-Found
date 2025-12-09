// "use client";

// import algoliasearch from "algoliasearch/lite";
// import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";

// const searchClient = algoliasearch(
//   process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
//   process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
// );

// export default function SearchPage({
//   searchParams,
// }: {
//   searchParams: { q?: string };
// }) {
//   const query = searchParams.q || "";

//   return (
//     <div className="max-w-3xl mx-auto py-10">
//       <InstantSearch searchClient={searchClient} indexName="items">
//         <SearchBox
//           defaultValue={query}
//           classNames={{
//             input: "w-full border p-3 rounded-md",
//           }}
//         />
//         <Hits hitComponent={Hit} />
//       </InstantSearch>
//     </div>
//   );
// }

// function Hit({ hit }: any) {
//   return (
//     <div className="border p-4 rounded-md my-3">
//       <h2 className="font-bold">{hit.title}</h2>
//       <p>{hit.desc}</p>
//       <h3>{hit.location}</h3>
//       <p>{hit.image}</p>
//     </div>
//   );
// }
