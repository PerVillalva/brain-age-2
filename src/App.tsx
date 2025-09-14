import { useState } from 'react';
import { TestMenu } from './components/TestMenu';
import { ReactionTimeApp } from './components/ReactionTimeApp';
import StroopApp from './apps/StroopApp';
import './App.css';

type TestType = 'menu' | 'reaction-time' | 'stroop';

function App() {
    const [currentTest, setCurrentTest] = useState<TestType>('menu');

    const handleTestSelect = (testType: 'reaction-time' | 'stroop') => {
        setCurrentTest(testType);
    };

    const handleBackToMenu = () => {
        setCurrentTest('menu');
    };

    const renderCurrentTest = () => {
        switch (currentTest) {
            case 'menu':
                return <TestMenu onTestSelect={handleTestSelect} />;

            case 'reaction-time':
                return <ReactionTimeApp onBackToMenu={handleBackToMenu} />;

            case 'stroop':
                return <StroopApp onReturnToMenu={handleBackToMenu} />;

            default:
                return <TestMenu onTestSelect={handleTestSelect} />;
        }
    };

    return <div className='App'>{renderCurrentTest()}</div>;
}

export default App;
