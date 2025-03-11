# Robot Framework - BuiltIn Library

## RobotLibrary/BuiltIn/FlowControl.js
- Continue For Loop - 繼續循環
- Continue For Loop If - 條件式繼續循環
- Exit For Loop - 退出循環
- Exit For Loop If - 條件式退出循環
- Pass Execution - 通過執行
- Pass Execution If - 條件式通過執行
- Skip - 跳過
- Skip If - 條件式跳過
- Wait Until Keyword Succeeds - 等待關鍵字成功 

## RobotLibrary/BuiltIn/KeyWord.js
- Return From Keyword - 從關鍵字返回
- Return From Keyword If - 條件式從關鍵字返回
- Run Keyword - 執行關鍵字
- Run Keyword And Continue On Failure - 執行關鍵字並在失敗時繼續
- Run Keyword And Expect Error - 執行關鍵字並預期錯誤
- Run Keyword And Ignore Error - 執行關鍵字並忽略錯誤
- Run Keyword And Return - 執行關鍵字並返回
- Run Keyword And Return If - 條件式執行關鍵字並返回
- Run Keyword And Return Status - 執行關鍵字並返回狀態
- Run Keyword And Warn On Failure - 執行關鍵字並在失敗時警告
- Run Keyword If - 條件式執行關鍵字
- Run Keyword If All Tests Passed - 如果所有測試通過則執行關鍵字
- Run Keyword If Any Tests Failed - 如果任何測試失敗則執行關鍵字
- Run Keyword If Test Failed - 如果測試失敗則執行關鍵字
- Run Keyword If Test Passed - 如果測試通過則執行關鍵字
- Run Keyword If Timeout Occurred - 如果發生超時則執行關鍵字
- Run Keyword Unless - 除非條件為真否則執行關鍵字
- Run Keywords - 執行多個關鍵字

## RobotLibrary/BuiltIn/Variable.js
- Get Variable Value - 獲取變數值
- Get Variables - 獲取所有變數
- Import Variables - 導入變數
- Replace Variables - 替換變數
- Set Global Variable - 設置 **全域** 變數
- Set Local Variable - 設置 **區域** 變數
- Set Suite Variable - 設置 **測試套件** 變數
- Set Task Variable - 設置 **任務** 變數
- Set Test Variable - 設置 **測試** 變數
- Set Variable - 設置變數
- Set Variable If - 條件式設置變數
- Variable Should Exist - 變數應存在
- Variable Should Not Exist - 變數不應存在

## RobotLibrary/BuiltIn/Assertion.js
- Keyword Should Exist - 關鍵字應存在
- Length Should Be - 長度應為
- Should Be Empty - 應為空值
- Should Be Equal - 應相等
- Should Be Equal As Integers - 應作為整數相等
- Should Be Equal As Numbers - 應作為數字相等
- Should Be Equal As Strings - 應作為字串相等
- Should Be True - 應為真
- Should Contain - 應包含
- Should Contain Any - 應包含任一
- Should Contain X Times - 應包含 X 次
- Should End With - 應以...結尾
- Should Match - 應匹配
- Should Match Regexp - 應匹配正則表達式
- Should Not Be Empty - 不應為空
- Should Not Be Equal - 不應相等
- Should Not Be Equal As Integers - 不應作為 **整數** 相等
- Should Not Be Equal As Numbers - 不應作為 **數字** 相等
- Should Not Be Equal As Strings - 不應作為 **字串** 相等
- Should Not Be True - 不應為真
- Should Not Contain - 不應包含
- Should Not Contain Any - 不應包含任一
- Should Not End With - 不應以...結尾
- Should Not Match - 不應匹配
- Should Not Match Regexp - 不應匹配正則表達式
- Should Not Start With - 不應以...開始
- Should Start With - 應以...開始

## RobotLibrary/BuiltIn/Convert.js
- Convert To Binary - 轉換為二進制
- Convert To Boolean - 轉換為布爾值 
- Convert To Bytes - 轉換為字節
- Convert To Hex - 轉換為十六進制
- Convert To Integer - 轉換為整數 
- Convert To Number - 轉換為數字
- Convert To Octal - 轉換為八進制
- Convert To String - 轉換為字串

## RobotLibrary/BuiltIn/Log.js
- Log - 記錄指定消息
- Log Many - 記錄多個消息 
- Log To Console - 將消息記錄到控制台 
- Log Variables - 記錄變數
- Reset Log Level - 重置記錄級別
- Set Log Level - 設置記錄級別

## RobotLibrary/BuiltIn/TestManagement.js
- Remove Tags - 移除標籤
- Set Suite Documentation - 設置測試套件文檔
- Set Suite Metadata - 設置測試套件元數據
- Set Tags - 設置標籤
- Set Test Documentation - 設置測試文檔
- Set Test Message - 設置測試消息

## RobotLibrary/BuiltIn/Resource.js
- Get Library Instance - 獲取 Library 實例
- Import Library - 導入 Library
- Import Resource - 導入 來源
- Reload Library - 重新載入 Library
- Set Library Search Order - 設置庫搜索順序

## RobotLibrary/BuiltIn/utils.js
- Call Method - 調用方法
- Catenate - 連接
- Comment - 註釋
- Create Dictionary - 創建字典
- Create List - 創建列表
- Evaluate - 使用 Python 表達式並返回結果
- Fail - 失敗
- Fatal Error - 致命錯誤
- Get Count - 獲取計數
- Get Length - 獲取長度
- Get Time - 獲取時間
- No Operation - 不執行任何操作
- Regexp Escape - 正則表達式轉意
- Repeat Keyword - 重複關鍵字
- Sleep - 暫停執行指定時間