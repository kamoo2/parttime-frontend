import { gql } from "graphql-tag";

export const QUERY_SEE_STORE = gql`
  query seeStore($id: Int!) {
    seeStore(id: $id) {
      ok
      error
      store {
        id
        store
        storeNumber
        photos {
          id
          photoURL
        }
        employees {
          id
          name
          age
          wage
          avatarURL
          phoneNumber
        }
        user {
          id
          name
          username
          phoneNumber
          avatarURL
        }
        isMine
        total_employees
        total_month_sail
        today_sail
        total_year_sail
      }
    }
  }
`;

export const QUERY_SEE_STORES = gql`
  query seeAllStores($page: Int) {
    seeAllStores(page: $page) {
      id
      store
      user {
        id
        username
        avatarURL
      }
      photos {
        photoURL
      }
      total_page(take: 9, home: true)
    }
  }
`;

export const SEE_DAILY_SALES_QUERY = gql`
  query seeDailySails($storeId: Int!, $year: Int!, $month: Int!) {
    seeDailySails(storeId: $storeId, year: $year, month: $month) {
      ok
      error
      sails {
        id
        year
        month
        day
        slug
        sail
      }
    }
  }
`;
