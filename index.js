class Tester {
    static tests = []
    
    test(name, testCallback) {
        Tester.tests.push({
            testName: name,
            testFn: testCallback,
            passed: null
        });
    }
    
    runTests() {
        if (Tester.tests.length < 1) {
            console.log("ENTER TESTS BEFORE RUNNING");
        }
        let results = {
            passed: 0,
            failed: 0
        };
        
        Tester.tests.map(test => {
            const start = new Date().getTime();
            let str = "- " + test.testName;
            try {
                test.testFn();
            } catch (e) {
                let end = new Date().getTime();
                str = "X" + str.substring(1) + " " + (end - start) + "ms";
                console.log(str);
                console.log(
                "\n\n" + e.message    
                );
                results.failed++;
                return {
                    ...test,
                    passed: false
                };
            }
            let end = new Date().getTime();
            str = "✓" + str.substring(1) + " " + (end - start) + "ms";
            console.log(str);
            results.passed++;
        })
        console.log(
            "\nTEST RESULTS:\nPASSED: " + results.passed + "\n" +
            "FAILED: " + results.failed
        );
    }
    
    expect(valToTest) {
        return {
            toBe: function(expectedVal) {
                if (!Object.is(valToTest, expectedVal)) {
                    throw Error(
                    "Failure!\nExpected: " + expectedVal + "\n" +
                    "Received: " + valToTest
                    );
                }
                return true;
            },
            
            toFail() {
                if (!!valToTest || !(typeof valToTest instanceof Error)) {
                    throw new Error(
                    "Failure!\n The expected value did not fail."    
                    );
                }
            }
        }
    }
}

const { test, runTests, expect } = new Tester();



test("perform cool operation", () => {
    expect(3).toBe(3);
});

test("function should fail", () => {
   function math(op, n1, n2) {
       if (op === "+")  {
           return n1 + n2;
       }
   }
   
   expect(math("-", 2, 5)).toFail();
});

runTests();
