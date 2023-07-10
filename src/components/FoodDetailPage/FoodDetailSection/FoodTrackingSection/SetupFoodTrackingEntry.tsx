import React, { useState } from "react";
import classNames from "classnames";
import EmptyNotice from "../../../EmptyNotice";
import Modal from "../../../Modal";

type Props = {
  className?: string;
};

export default function SetupFoodTrackingEntry({ className }: Props) {
  const [showFoodTrackingSetupModal, setShowFoodTrackingSetupModal] =
    useState(false);
  return (
    <>
      <EmptyNotice
        className={classNames(className)}
        message="Not amount tracking set for this food. Click to setup"
        onClick={() => setShowFoodTrackingSetupModal(true)}
      />
      <Modal
        label="Setup food tracking"
        opened={showFoodTrackingSetupModal}
        onClose={() => setShowFoodTrackingSetupModal(false)}
      >
        <
      </Modal>
    </>
  );
}
