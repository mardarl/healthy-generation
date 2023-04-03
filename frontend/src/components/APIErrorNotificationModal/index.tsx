import { useAPIError } from '../../common/hooks/useAPIError'
import { StyledErrorNotification, StyledError } from '../../styles/APIErrorNotificationModal.styled'
import Button from '../../ui-components/Button'
import Modal from '../../ui-components/Modal'

export const APIErrorNotificationModal = () => {
  const { error, removeError } = useAPIError()

  const handleSubmit = () => {
    removeError()
  }

  return (
    <Modal open={!!error} onClose={handleSubmit}>
      <StyledErrorNotification>
        <StyledError>
          <h4>{'oops!'}</h4>
          <span>{'something went wrong'}</span>
          {error && error.message && <p>{error.message.toLowerCase()}</p>}
        </StyledError>
        <Button data-testid='notification-submit-button' onClick={handleSubmit}>
          ok
        </Button>
      </StyledErrorNotification>
    </Modal>
  )
}
