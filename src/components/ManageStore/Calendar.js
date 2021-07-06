import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  SEE_WORKDAYS_QUERY,
  SEE_WORKTIMES_QUERY,
} from "../../apollo/queries/workday";
import { CREATE_WORKDAY_MUTATION } from "../../apollo/mutation/workday";
import { SEE_SALARY_QUERY } from "../../apollo/queries/employee";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import FormError from "../auth/FormError";

const Description = styled.div`
  width: 50%;
  margin: 0 auto;
  form {
    margin: 10px 0;
    display: flex;
    align-items: center;
    input {
      width: 60px;
      font-size: 20px;
      border-bottom: 1px solid black;
      text-align: center;
    }
    button {
      background-color: ${(props) => props.theme.login.btnBgColor};
      color: ${(props) => props.theme.login.btnFontColor};
      padding: 8px 12px;
      border-radius: 7px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
`;
const Name = styled.span`
  font-size: 30px;
  border-radius: 10px;
  padding: 5px 7px;
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
`;
const Message = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;
const Span = styled.h1`
  font-size: 20px;
  margin-right: 10px;
`;

const Time = styled.span`
  padding: 10px 15px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.login.btnBgColor};
  color: ${(props) => props.theme.login.btnFontColor};
  position: absolute;
  top: 50px;
  right: 50px;
`;

function Calendar({ employeeId, name }) {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  let eventObjs = [];

  const [wTime, setWTime] = useState(0);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { data: workTimeData } = useQuery(SEE_WORKTIMES_QUERY);
  const [getWorkdays, { data }] = useLazyQuery(SEE_WORKDAYS_QUERY, {
    variables: {
      employeeId,
    },
  });

  const [getSalary, { data: salaryData }] = useLazyQuery(SEE_SALARY_QUERY, {
    variables: {
      employeeId,
      year,
      month,
    },
  });
  const [createWorkdayMutation, { loading }] = useMutation(
    CREATE_WORKDAY_MUTATION,
    {
      refetchQueries: [
        {
          query: SEE_WORKDAYS_QUERY,
          variables: {
            employeeId,
          },
        },
        {
          query: SEE_SALARY_QUERY,
          variables: {
            employeeId,
            year,
            month,
          },
        },
      ],
      onCompleted: (data) => {
        if (!data?.createWorkday?.ok) {
          setError("result", { message: data?.createWorkday?.error });
        }
      },
    }
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getWorkdays();
      getSalary();
    }
    return () => {
      isMounted = false;
    };
  }, [getWorkdays, getSalary]);

  const handleDateClick = (arg) => {
    if (loading) {
      return;
    }
    const { date } = arg;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    createWorkdayMutation({
      variables: {
        year,
        month,
        day,
        workTime: parseInt(wTime),
        employeeId,
      },
    });
  };
  eventObjs = data?.seeWorkdays.map((workday) => {
    return {
      title: `${workday.workTime.time}시간 출근완료`,
      start:
        workday.month < 10
          ? workday.day < 10
            ? `${workday.year}-0${workday.month}-0${workday.day}`
            : `${workday.year}-0${workday.month}-${workday.day}`
          : `${workday.year}-${workday.month}-0${workday.day}`,
    };
  });
  const onSubmitValid = (data) => {
    setWTime(data.wt);
  };
  const wt = register("wt");
  return (
    <>
      <Name>{name}님</Name>
      <Description>
        <Message>
          {month}월달 실시간 월급은 {salaryData?.seeSalary?.salary}원 입니다.
        </Message>
        <Message>
          {month}월달 출근 일수는 {salaryData?.seeSalary?.workdayOfMonth}일
          입니다.
        </Message>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Span>TIME </Span>
          <select
            {...wt}
            onChange={(e) => {
              clearErrors("result");
              wt.onChange(e);
            }}
          >
            <option value={0}>선택안함</option>
            {workTimeData?.seeWorkTimes?.map((time) => {
              return (
                <option key={time.id} value={time.time}>
                  {time.time}
                </option>
              );
            })}
          </select>
          <button type="submit">근무 시간 등록</button>
        </form>
        <FormError message={errors?.workTime?.message} />
        <FormError message={errors?.result?.message} />
        <Time>{wTime}시간</Time>
      </Description>
      <FullCalendar
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        showNonCurrentDates={false}
        datesSet={(date) => {
          setYear(date.start.getFullYear());
          setMonth(date.start.getMonth() + 1);
        }}
        fixedWeekCount={false}
        events={eventObjs}
      />
    </>
  );
}

export default Calendar;
