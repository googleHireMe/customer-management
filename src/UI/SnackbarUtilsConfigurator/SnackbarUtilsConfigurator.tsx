import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack'
import React from 'react'

interface Props {
  setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void;
}
const InnerSnackbarUtilsConfigurator: React.FC<Props> = (props: Props) => {
  props.setUseSnackbarRef(useSnackbar());
  return null;
}

let useSnackbarRef: WithSnackbarProps;
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
  useSnackbarRef = useSnackbarRefProp;
}

export const SnackbarUtilsConfigurator = () => {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
}

export const NotificationService = {
  success(msg: string) {
    console.log('data loaded');
    this.toast(msg, 'success')
  },
  warning(msg: string) {
    this.toast(msg, 'warning')
  },
  info(msg: string) {
    this.toast(msg, 'info')
  },
  error(msg: string) {
    this.toast(msg, 'error')
  },
  toast(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, { variant })
  }
}