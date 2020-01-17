import gql from 'graphql-tag';

export const CreateNewBuild = gql`
  mutation($input: RegisterBuildInput!) {
    registerBuild(input: $input){
      id
    }
  }
`