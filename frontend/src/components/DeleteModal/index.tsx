import { FunctionComponent } from 'react'
import { Content, Buttons } from '../../styles/DeleteModal.styled'
import Button from '../../ui-components/Button'
import Modal, { ModalProps } from '../../ui-components/Modal'

export type DeleteModalProps = {
  onDelete?: () => void
} & Pick<ModalProps, 'onClose' | 'open'>

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ open, onClose, onDelete }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <span>are you sure you wanna delete it?</span>
        <Buttons>
          <Button onClick={onDelete}>yes</Button>
          <Button onClick={onClose}>no</Button>
        </Buttons>
      </Content>
    </Modal>
  )
}
export default DeleteModal
