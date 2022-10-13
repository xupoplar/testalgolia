import "./styles.css";
import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  useRefinementList
} from "react-instantsearch-hooks-web";
import { RefinementList as RefinementListUiComponent } from "react-instantsearch-hooks-web/dist/es/ui/RefinementList";

import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

const refinementAttribute = "brand";

export default function App() {
  return (
    <div className="App">
      <InstantSearch searchClient={searchClient} indexName="instant_search">
        <Refinements />
        <Hits />
      </InstantSearch>
    </div>
  );
}

function Refinements() {
  const [showDialog, setShowDialog] = React.useState(false);
  const {
    canRefine,
    canToggleShowMore,
    isShowingMore,
    items,
    refine,
    toggleShowMore
  } = useRefinementList(
    {
      attribute: refinementAttribute
      // operator,
      // limit,
      // showMore,
      // showMoreLimit,
      // sortBy,
      // escapeFacetValues,
      // transformItems
    },
    {
      $$widgetType: "ais.refinementList"
    }
  );

  function onRefine(item) {
    refine(item.value);
  }

  const uiProps = {
    items,
    canRefine,
    onRefine,
    query: "",
    canToggleShowMore,
    onToggleShowMore: toggleShowMore,
    isShowingMore
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>Show Dialog</button>

      <Dialog isOpen={showDialog} onDismiss={() => setShowDialog(false)}>
        <RefinementListUiComponent {...uiProps} />
      </Dialog>
    </>
  );
}
