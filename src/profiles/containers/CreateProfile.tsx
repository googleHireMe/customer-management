import { Button, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { commonProps } from "../../core/consts/consts";
import { Panel } from "../../UI/Panel/Panel";
import { useFlexClasses } from "../../UI/styles/flex-classes";
import { useGenericClasses } from "../../UI/styles/generic-classes";
import { profileApi } from "../api/profile-api";
import { Profile } from "../interfaces/profile";
import { createProfile } from "../state/profile/profileThunks";

const useStyles = makeStyles((theme) => ({
  sectionInnerGap: {
    rowGap: '20px'
  },
  sendingSetting: {
    rowGap: '15px'
  },
  widthLimit300: {
    maxWidth: '300px'
  },
}));

export function CreateProfile() {
  const classes = useStyles();
  const genericClasses = useGenericClasses();
  const flex = useFlexClasses();

  const { customerId } = useParams<{ customerId: string }>();
  const history = useHistory();

  const [newProfileName, setNewProfileName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    profileApi.updateCurrentCustomerId(customerId);
  }, [customerId]);

  const save = () => {
    const item: Partial<Profile> = { 
      customerId: +customerId,
      title: newProfileName,
      pricelists: []
    };
    dispatch(createProfile(item as any));
    history.goBack();
  };

  return (
    <Panel className={`${flex.column} ${classes.sectionInnerGap}`}>
      <div className={`${flex.column} ${classes.sectionInnerGap}`}>
        <div className={genericClasses.subtitle}>
          Создание прайса
        </div>
        <div className={`${flex.column} ${classes.sendingSetting}`}>
          <TextField
            name='title'
            value={newProfileName ?? ''}
            onChange={event => { setNewProfileName(event.target.value)}}
            label="Название прайса"
            variant="outlined"
            className={classes.widthLimit300}
            {...commonProps}
          />
        </div>
      </div>

      <div className={`${flex.flexStart} ${flex.fullWidth}`}>
        <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          onClick={save}
        >
          Сохранить
        </Button>
      </div>
    </Panel>
  );
}