import styled from "@emotion/styled"
import React, { useState, useEffect } from "react"
import { AppBar } from "@lib/components/Appbar"
import {
  Title01,
  Subheading01,
  Subheading02,
  Detail,
} from "@lib/components/Text"
import SvgArrowBack from "@lib/components/Icons/SvgArrowBack"
import { useRouter } from "next/router"
import CountDown, { zeroPad } from "react-countdown"
import { COLORS } from "@lib/styles/colors"

export const MailVerifyImpl = () => {
  const TIMEOUT_MESSAGE = "시간이 초과되었습니다. 다시 시도해주세요."
  const WRONG_VERIFICATION_NUMBER_MESSAGE =
    "인증 번호가 틀렸습니다. 다시 시도해주세요."

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [verificationNumber, setVerificationNumber] = useState("")

  const [isVerificationNumberRequested, setIsVerificationNumberRequested] =
    useState(false)

  const [isTimeout, setIsTimeout] = useState(false)

  const [isVerificationNumberWrong, setIsVerificationNumberWrong] =
    useState(false)

  const [timeoutDeadline, setTimeoutDeadline] = useState(0)

  const [warningMessage, setWarningMessage] = useState("")

  const [isCompleteButtonActive, setIsCompleteButtonActive] = useState(false)

  useEffect(() => {
    if (isTimeout) {
      setWarningMessage(TIMEOUT_MESSAGE)
    } else if (isVerificationNumberWrong) {
      setWarningMessage(WRONG_VERIFICATION_NUMBER_MESSAGE)
    } else {
      setWarningMessage("")
    }
  }, [isTimeout, isVerificationNumberWrong])

  useEffect(() => {
    verificationNumber === "" || isTimeout
      ? setIsCompleteButtonActive(false)
      : setIsCompleteButtonActive(true)
  }, [verificationNumber, isTimeout])

  const countDownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setIsTimeout(true)
      return <Subheading01 style={{ color: COLORS.red }}>00:00</Subheading01>
    } else {
      isTimeout && setIsTimeout(false)
      return (
        <Subheading01 style={{ color: COLORS.red }}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </Subheading01>
      )
    }
  }

  const requestVerificationNumberHandler = () => {
    setIsVerificationNumberRequested(true)
    setTimeoutDeadline(Date.now() + 179000)
    // POST /email/verification
  }

  const verifyHandler = () => {
    setIsVerificationNumberWrong(true) // only for testing
    // POST /email/verification/code
    // router.back() // if success
  }

  return (
    <Wrapper>
      <AppBar
        LeftImage={() => (
          <BackButton
            onClick={() => {
              router.back()
            }}
          >
            <SvgArrowBack width={30} height={30} />
          </BackButton>
        )}
      >
        <Title01 style={{ marginLeft: 12 }}>이메일 인증</Title01>
      </AppBar>
      <Content>
        <DescriptionTextWrapper>
          <DescriptionText>
            <Title01>강의평 서비스 이용을 위해</Title01>
            <Title01>이메일 인증이 필요합니다.</Title01>
          </DescriptionText>
        </DescriptionTextWrapper>

        <EmailInputWrapper>
          <Subheading01>이메일</Subheading01>
          <EmailInputBar>
            <EmailInput
              placeholder={"이메일을 입력하세요"}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <MailAddress>
              <>
                <Subheading02>@snu.ac.kr</Subheading02>
              </>
            </MailAddress>
            <RequestVerificationButton
              onClick={requestVerificationNumberHandler}
            >
              <Subheading01 style={{ color: "#1bd0c8" }}>
                {isVerificationNumberRequested ? "다시 요청" : "인증요청"}
              </Subheading01>
            </RequestVerificationButton>
          </EmailInputBar>
        </EmailInputWrapper>

        <VerificationNumberInputWrapper>
          <Subheading01>인증번호</Subheading01>
          <VerificationNumberInputBar>
            <VerificationNumberInput
              placeholder={"인증번호 6자리를 입력하세요"}
              onChange={(e) => {
                setVerificationNumber(e.target.value)
              }}
            />
            {isVerificationNumberRequested && (
              <CountDownWrapper>
                <CountDown
                  date={timeoutDeadline}
                  renderer={countDownRenderer}
                />
              </CountDownWrapper>
            )}
          </VerificationNumberInputBar>
          <WarningText>
            <Detail style={{ color: COLORS.red }}>{warningMessage}</Detail>
          </WarningText>
        </VerificationNumberInputWrapper>

        {isCompleteButtonActive ? (
          <ActiveCompleteButton onClick={verifyHandler}>
            <Title01 style={{ color: "white" }}>완료</Title01>
          </ActiveCompleteButton>
        ) : (
          <InactiveCompleteButton>
            <Title01 style={{ color: "white" }}>완료</Title01>
          </InactiveCompleteButton>
        )}
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const BackButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  padding: 0;
`

const Content = styled.div`
  padding: 22px 20px 0 20px;
`

const DescriptionTextWrapper = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const DescriptionText = styled.div``

const EmailInputWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`

const EmailInputBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  height: 34px;
  width: 100%;
  border-bottom: solid 1px #c4c4c4;
`

const VerificationNumberInputWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  position: relative;
`

const VerificationNumberInputBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 34px;
  width: 100%;
  border-bottom: solid 1px #c4c4c4;
`

const MailAddress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2px 0 2px;
`

const RequestVerificationButton = styled.button`
  width: 85px;
  height: 100%;
  background-color: white;
  border: none;

  &:active {
    background-color: #eaeaea;
  }
`

const CountDownWrapper = styled.div`
  width: 56px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const InactiveCompleteButton = styled.button`
  height: 60px;
  width: 100%;
  margin-top: 40px;
  background-color: #c4c4c4;
  border: none;
`

const ActiveCompleteButton = styled.button`
  height: 60px;
  width: 100%;
  margin-top: 40px;
  background-color: ${COLORS.blue};
  border: none;
`

const TransparentInput = styled.input`
  border: none;
  flex-grow: 1;
  line-height: 15px;
  padding-left: 0;

  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;

  ::placeholder {
    color: #c4c4c4;
  }
`

const EmailInput = styled(TransparentInput)``

const VerificationNumberInput = styled(TransparentInput)``

const WarningText = styled.div`
  height: 15px;
  position: absolute;
  bottom: -17px; // line height + 2px gap
`
