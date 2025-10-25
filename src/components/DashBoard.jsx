import React, { useState, useMemo, useCallback } from "react";
import Header from "./Header";
import ChartComponent from "./ChartComponent";
import IssueTab from "./IssueTab";
import {
  projectData,
  projectKeys,
  chartKeyMap,
  chartColors,
} from "../data/constants";
import "../styles/Dashboard.css";
import api from "../api/axiosInstance.js";
import { useEffect } from "react";

const DashBoard = () => {
  const [selectedProject, setSelectedProject] = useState(projectKeys[0]);
  const [dropdownValue, setDropdownValue] = useState(projectKeys[0]);

  const [meData, setMeData] = useState(null);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // /portal/me 호출
        const meResponse = await api.get("/portal/me");
        setMeData(meResponse.data);

        // /portal/pt/myprojects 호출
        const params = new URLSearchParams({
          systemRole: "SVCMGR",
          serviceRole: "",
          group_code: "SVCMGR",
          user_id: "demo_admin",
          sp_uid: "20250527220054578551",
        });

        const projectsResponse = await api.get(
          `/portal/pt/myprojects?${params}`
        );
        setProjectsData(projectsResponse.data);

        if (
          projectsResponse.data?.list &&
          projectsResponse.data.list.length > 0
        ) {
          const projects = projectsResponse.data.list;
          setProjectsData(projects);

          // ✅ 첫 번째 프로젝트를 기본값으로 설정
          const firstProjectNo = projects[0].project_no;
          setSelectedProject(firstProjectNo);
          setDropdownValue(firstProjectNo);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchData();
  }, []);

  const initialLineVisibility = useMemo(() => {
    return Object.values(chartKeyMap).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
  }, []);

  const [lineVisibility, setLineVisibility] = useState(initialLineVisibility);

  const currentData = useMemo(() => {
    const data = projectData[selectedProject];

    // 데이터가 없으면 기본값 반환
    if (!data) {
      return {
        chartData: [],
        summary: {
          vulner: 0,
          security: 0,
          bug: 0,
          smell: 0,
          complexity: 0,
          total: 0,
        },
      };
    }

    return data;
  }, [selectedProject]);

  const handleSelectProject = useCallback(() => {
    setSelectedProject(dropdownValue);
    setLineVisibility(initialLineVisibility);
  }, [dropdownValue, initialLineVisibility]);

  const toggleLine = useCallback((key) => {
    setLineVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <div className="dashboard-container">
      <Header
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
        handleSelectProject={handleSelectProject}
        testDate={meData?.lastResponseDate}
        projectKeys={projectKeys}
        projectsData={projectsData}
      />
      <main className="dashboard-main">
        <ChartComponent
          chartData={currentData.chartData}
          lineVisibility={lineVisibility}
          chartKeyMap={chartKeyMap}
          chartColors={chartColors}
        />
        <IssueTab
          summaryData={currentData.summary}
          lineVisibility={lineVisibility}
          toggleLine={toggleLine}
          chartKeyMap={chartKeyMap}
        />
      </main>
    </div>
  );
};

export default DashBoard;
