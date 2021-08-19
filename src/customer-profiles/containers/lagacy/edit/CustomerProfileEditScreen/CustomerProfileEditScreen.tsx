import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AnswerSettingsCard from "../cards/AnswerSettingsCard/AnswerSettingsCard";
import CustomerProfileMainSettingsCard from "../cards/CustomerProfileMainSettingsCard/CustomerProfileMainSettingsCard";
import OrderSettingsCard from "../cards/OrderSettingsCard/OrderSettingsCard";
import ParsingSettingsCard from "../cards/ParsingSettingsCard/ParsingSettingsCard";
import PricelistsCard from "../cards/PricelistsCard/PricelistsCard";
import { Row, Col } from 'react-bootstrap';


export function CustomerProfileEditScreen() {
  const dispatch = useDispatch();
  const { profileId, customerId } = useParams<{ profileId: string, customerId: string }>();
  const goToProfilesList = () => dispatch(push('/customer-profiles/'));

  return (
    <>
      {/* <Tooltip title="Назад" placement="right">
        <IconButton
          color="default"
          style={{ marginBottom: '20px' }}
          onClick={goToProfilesList}>
          <ChevronLeftIcon />
        </IconButton>
      </Tooltip> */}
      <>
        <Row>
          <Col xs={12}>
            <CustomerProfileMainSettingsCard
              profileId={profileId}
            />
          </Col>
          {profileId ?
            <>
              <Col xs={12}>
                <OrderSettingsCard
                  profileId={profileId}
                />
              </Col>
              <Col xs={12}>
                <ParsingSettingsCard
                  profileId={profileId}
                />
              </Col>
              <Col xs={12}>
                <AnswerSettingsCard
                  profileId={profileId}
                />
              </Col>
              <Col xs={12}>
                <PricelistsCard
                  profileId={profileId}
                />
              </Col>
            </>
            : null
          }

        </Row>
      </>
    </>
  );

}