// src/components/NoteModal.jsx
import { Modal, Stack, Text, Title } from "@mantine/core";
import { format } from "date-fns";

export default function NoteModal({ note, isOpen, onRequestClose }) {
  return (
    <Modal
      opened={!!note && isOpen}
      onClose={onRequestClose}
      title={<Title order={3}>{note?.title || "Untitled note"}</Title>}
      size="lg"
      centered
      withCloseButton
      closeButtonProps={{ size: "sm" }}        // make the close button small
      overlayProps={{ opacity: 0.35, blur: 2 }} // nicer overlay
      radius="md"
      padding="md"
    >
      {note && (
        <Stack gap="xs">
          <Text size="xs" c="dimmed">
            Created: {format(note.createdAt, "MMM do h:mm a")}
          </Text>
          <Text style={{ whiteSpace: "pre-wrap" }}>{note.body}</Text>
        </Stack>
      )}
    </Modal>
  );
}
