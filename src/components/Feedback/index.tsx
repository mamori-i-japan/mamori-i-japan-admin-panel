import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';
import styled from 'styled-components';
import {
  closeErrorAlertAction,
} from '../../redux/Feedback/actions';

const FeedbackContainer = styled.div`
 position: fixed;
    left: 0;
    top: 0;
    width: 100%;
`;

export default () => {
  const dispatch = useDispatch();

  const isSuccess = useSelector(({ feedback }: any) => feedback.isSuccess);
  const successMessage = useSelector(
    ({ feedback }: any) => feedback.successMessage
  );
  const isError = useSelector(({ feedback }: any) => feedback.isError);
  const errorMessage = useSelector(
    ({ feedback }: any) => feedback.errorMessage
  );

  const onErrorAlertClose = useCallback(() => dispatch(closeErrorAlertAction()), [dispatch]);

  return (
    <FeedbackContainer className="feedback-container">
      {isSuccess && (
        <Alert
          message={successMessage}
          type="success"
          banner
        />
      )}
      {isError && (
        <Alert
          message={errorMessage}
          type="error"
          banner
          closable
          onClose={onErrorAlertClose}
        />
      )}
    </FeedbackContainer>
  )
}



