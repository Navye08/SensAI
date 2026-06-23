import { getAssessments } from "@/actions/interview";
import QuizList from "./_component/quiz-list";
import PerformanceChart from "./_component/performace-chart";
import StatsCards from "./_component/stats-cards";


export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className=" mt-[80px] text-6xl font-bold gradient-title">
          Interview Preparation
        </h1>
      </div>
      <div className="space-y-6">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}