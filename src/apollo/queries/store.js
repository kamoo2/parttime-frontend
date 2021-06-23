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
        category {
          id
          name
        }
        holidays {
          id
          name
        }
        rules {
          id
          name
        }
        isMine
        total_employees
        total_month_sail
        today_sail
        total_year_sail
        commentCount
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
        id
        photoURL
      }
      total_page(take: 9, home: true)
      isLiked
      likeCount
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

export const MY_STORES_QUERY = gql`
  query myStores($page: Int) {
    myStores(page: $page) {
      id
      store
      photos {
        id
        photoURL
      }
      user {
        id
        username
        avatarURL
      }
      isLiked
      likeCount
      total_page(take: 3, home: false)
    }
  }
`;
