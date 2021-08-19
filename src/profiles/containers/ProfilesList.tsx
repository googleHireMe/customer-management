import { makeStyles, MenuItem } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { RootState } from "../../store/rootReducer";
import { ActionsMenu } from "../../UI/ActionsMenu/ActionsMenu";
import { GenericTable } from "../../UI/GenericTable/GenericTable";
import { useFlexClasses } from "../../UI/styles/flex-classes";
import { ProfilesListItem } from "../interfaces/profiles-list-item";
import { Panel } from "../../UI/Panel/Panel";
import { deleteProfile, loadProfilesList } from "../state/profilesList/profilesListThunks";
import { profileApi } from "../api/profile-api";
import { Column } from "../../core/models/interfaces/column";
import { setProfilesListFilter } from "../state/profilesList/profilesListSlice";
import { mapArrayToString } from "../../core/utils/map-array-to-string";

const useStyles = makeStyles({
  toolbar: {
    padding: '0px'
  },
  searchControl: {
    maxWidth: '280px'
  },
  header: {
    '& *': {
      backgroundColor: '#FFFFFF',
      textTransform: 'uppercase',
      color: '#A6B0B8'
    }
  },
  widthLimit420: {
    maxWidth: '420px'
  },
  widthLimit310: {
    maxWidth: '310px'
  },
  widthLimit150: {
    maxWidth: '150px'
  }
});

export function ProfilesList() {
  const classes = useStyles();
  const flex = useFlexClasses();

  const { customerId: id } = useParams<{ customerId: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const list = useSelector<RootState, ProfilesListItem[]>(state => state.profilesList.profilesList);
  const filter = useSelector<RootState, string>(state => state.profilesList.filter);

  useEffect(() => {
    profileApi.updateCurrentCustomerId(id);
    if (id) { dispatch(loadProfilesList()); }
  }, [id]);

  const updateFilter = (value: string) => { dispatch(setProfilesListFilter(value)); }

  const create = () => { history.push(`${url}/create`); }
  const edit = (id: string) => { history.push(`${url}/${id}`); }
  const send = (id: string) => { };
  const download = (id: string) => {  };
  const remove = (id: string) => { dispatch(deleteProfile(id)) };

  const columns: Column<ProfilesListItem>[] = [
    {
      headerName: '',
      propName: 'isActive'
    },
    {
      headerName: 'Название',
      propName: 'title'
    },
    {
      headerName: 'Наценка, %',
      propName: 'margin'
    },
    {
      headerName: 'Почта для отправки',
      propName: 'emails',
      displayMapper: ((item, key) => mapArrayToString(item[`${key}`])) 
    },
    {
      headerName: 'Формат',
      propName: 'fileType'
    },
    {
      headerName: 'Расписание',
      propName: 'emailSchedule',
      displayMapper: ((item, key) => mapArrayToString(item[`${key}`])) 
    },
    {
      headerName: 'Содержание',
      propName: 'includedPricelists',
      displayMapper: ((item, key) => mapArrayToString(item[`${key}`])) 
    },
    {
      headerName: 'Строк',
      propName: 'isActive'
    },
    {
      getId: () => 'actions',
      displayMapper: (profile: ProfilesListItem) => (
        <div>
          <ActionsMenu>
            <MenuItem onClick={() => {edit(profile.id)}}>Редактировать</MenuItem>
            <MenuItem onClick={() => {send(profile.id)}}>Отправить</MenuItem>
            <MenuItem onClick={() => {download(profile.id)}}>Скачать</MenuItem>
            <MenuItem onClick={() => {remove(profile.id)}}>Удалить</MenuItem>
          </ActionsMenu>
        </div>
      )
    }
  ];

  return (
    <Panel>
      <GenericTable
        idKey="id"
        list={list}
        columns={columns}
        createButtonSettings={{
          text: 'Создать прайс-лист',
          handleClick: create
        }}
        filterSettings={{
          filterByPropsList: ['title'],
          placeholder: 'Название',
          currentValue: filter,
          handleUpdate: updateFilter
        }}
      />
    </Panel>
  );
}