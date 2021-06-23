import styled from "styled-components";

const SPhotos = styled.div`
  width: 100%;
  padding: 48px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Photo = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 5px;
  margin-bottom: 10px;
`;
const Photos = ({ previewImages }) => {
  return (
    <SPhotos>
      {previewImages.length === 1 &&
        previewImages.map((url, index) => {
          return (
            <Photo
              width="100%"
              height="100%"
              key={index}
              src={url}
              alt={`${index}-photo`}
            />
          );
        })}
      {previewImages.length === 2 &&
        previewImages.map((url, index) => {
          return (
            <Photo
              width="330px"
              height="330px"
              key={index}
              src={url}
              alt={`${index}-photo`}
            />
          );
        })}

      {previewImages.length > 2 &&
        previewImages.map((url, index) => {
          return (
            <Photo
              width="200px"
              height="200px"
              key={index}
              src={url}
              alt={`${index}-photo`}
            />
          );
        })}
    </SPhotos>
  );
};

export default Photos;
