import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// exporting getServerSideprops function

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query( {
    query: gql`
      query MyQuery 
        {
          allVerseOfTheDays(last : 1) {
            nodes {
              verseOrder
              date
            }
          }
        }
    `,
    
  });
  
  
 
  const { verseData } = await client.query({
    query: gql`
      query MyQuery {
        allGitaVerses(condition: {id: ${data.verseOrder}}) {
          nodes {
            verseNumber
            id
            text
            transliteration
            wordMeanings
          }
        }
      }
      
       
    `,
  });
  const finalData = verseData?.allGitaVerses?.nodes[0];
  return {
    props: {
      finalData,
    },
  };

}


//exporting VerseOfDay

 const VerseOfDay = ({finalData}) =>{
  const {
    verseNumber,
    id,
    text,
    transliteration,
    wordMeanings,
    
  } = finalData;


  return (
    <div className="max-w-7xl mx-auto z-50 px-4 sm:px-6">
      <div className="bg-white dark:bg-dark-100 shadow-lg rounded-xl  mt-10 p-8 text-gray-400">
        <h2 className="text-my-orange font-bold mb-4 divider line one-line px-4">
          Verse of the day - BG {id}
        </h2>
        <p className="text-lg">
          {" "}
          {text}


          

          
         {" "}
        </p>
        <button className="uppercase text-black dark:text-white mt-4 font-bold text-sm hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none">
          See more
        </button>
      </div>
    </div>
  );
} 
export default VerseOfDay;




  
 
   



