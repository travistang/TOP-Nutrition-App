import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "../Input/TextInput";
import Section from "../Section";
import LocalStorage from "../../utils/LocalStorage";
import DatabaseSynchronization from "../../domain/DatabaseSynchronization";
import Button, { ButtonStyle } from "../Input/Button";

export default function ServerConnectionSection() {
  const [remoteUrl, setRemoteUrl] = useState(
    LocalStorage.getFromStore(DatabaseSynchronization.LS_DATABASE_KEY)
  );
  const updateUrl = () => {
    LocalStorage.setStore(DatabaseSynchronization.LS_DATABASE_KEY, remoteUrl);
  };

  return (
    <Section label="Server connections">
      <div className="grid grid-cols-6 gap-2 pt-2">
        <span className="col-span-full text-xs my-2">
          <FontAwesomeIcon icon="info-circle" className="pr-2" />
          You do not need to fill out this section for this app to function. The
          information in this part is for sharing the data stored in this app to
          other Travis' Over-engineering Project (TOP) for backup and analysis
          purposes.
        </span>
        <TextInput
          value={remoteUrl}
          className="col-span-full"
          onChange={setRemoteUrl}
          label="TOP Nutrition Service URL"
        />
        <Button
          onClick={updateUrl}
          className="col-start-6"
          text="Update"
          icon="sync"
          buttonStyle={ButtonStyle.Block}
        />
      </div>
    </Section>
  );
}
