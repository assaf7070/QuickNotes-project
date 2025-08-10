import { useEffect, useMemo, useState } from "react";
import { Modal, Stack, Title, TextInput, Textarea, Text, Group } from "@mantine/core";


export default function NoteModal({ note, isOpen, onRequestClose, onUpdate }) {
  // Local drafts (persist while modal is open)
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingBody, setIsEditingBody] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [bodyDraft, setBodyDraft] = useState("");

  // Reset drafts when a different note opens
  useEffect(() => {
    setIsEditingTitle(false);
    setIsEditingBody(false);
    setTitleDraft(note?.title || "");
    setBodyDraft(note?.body || "");
  }, [note]);

  // Grow editor roughly to current body size (capped)
  const minRows = useMemo(() => {
    const lines = (bodyDraft || "").split("\n").length;
    return Math.min(Math.max(lines, 4), 18);
  }, [bodyDraft]);

  const handleUpdate = () => {
    if (!note) return;
    const t = titleDraft.trim();
    const b = bodyDraft.trim();
    if (!b) return; // don't allow empty body
    onUpdate(note.id, { title: t, body: b });
    onRequestClose();
  };

  return (
    <Modal
      opened={!!note && isOpen}
      onClose={onRequestClose}
      centered
      withCloseButton
      closeButtonProps={{ size: "sm" }}
      overlayProps={{ opacity: 0.35, blur: 2 }}
      radius="md"
      padding="md"
      // Title area: inline edit or preview of the draft
      title={
        isEditingTitle ? (
          <TextInput
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape")
                setIsEditingTitle(false);
            }}
            onBlur={() => setIsEditingTitle(false)}
          />
        ) : (
          <Title
            order={3}
            className="click-to-edit"
            onClick={() => setIsEditingTitle(true)}
            title="Click to edit title"
          >
            {titleDraft || "Untitled note"}{" "}
            {/* preview the draft, not saved value */}
          </Title>
        )
      }
    >
      {note && (
        <Stack gap="md">
          {isEditingBody ? (
            <Textarea
              value={bodyDraft}
              onChange={(e) => setBodyDraft(e.target.value)}
              autoFocus
              autosize
              minRows={minRows}
              maxRows={24}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  handleUpdate();
                }
                if (e.key === "Escape") setIsEditingBody(false);
              }}
              onBlur={() => setIsEditingBody(false)}
            />
          ) : (
            <Text
              style={{ whiteSpace: "pre-wrap" }}
              className="click-to-edit"
              title="Click to edit body"
              onClick={() => setIsEditingBody(true)}
            >
              {bodyDraft} {/* preview the draft while not editing */}
            </Text>
          )}

          {/* Actions – same design as Add button */}
          <Group justify="flex-end">
            <button
              type="button"
              className="btn"
              onClick={handleUpdate}
              disabled={!bodyDraft.trim()}
            >
              Update
            </button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
}
