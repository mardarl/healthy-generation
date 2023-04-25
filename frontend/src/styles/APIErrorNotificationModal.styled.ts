import styled from 'styled-components'

export const ErrorNotification = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
`

export const ErrorContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  text-align: center;

  h4 {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.disabledText};
    margin: 0;
  }

  span {
    font-size: 0.75rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.disabledText};
  }
`
