import { FunctionComponent } from 'react'
import { useAPIError } from '../../common/hooks/useAPIError'
import { ErrorNotification, ErrorContainer } from '../../styles/APIErrorNotificationModal.styled'
import Button from '../../ui-components/Button'
import Modal from '../../ui-components/Modal'

export const APIErrorNotificationModal: FunctionComponent = () => {
  const { error, removeError } = useAPIError()

  const handleClick = () => {
    removeError()
  }

  return (
    <Modal open={!!error} onClose={handleClick}>
      <ErrorNotification>
        <ErrorContainer>
          <h4>oops!</h4>
          <span>something went wrong</span>
          {error && error.message && <p>{error.message.toLowerCase()}</p>}
        </ErrorContainer>
        <Button data-testid='notification-submit-button' onClick={handleClick}>
          ok
        </Button>
      </ErrorNotification>
    </Modal>
  )
}
