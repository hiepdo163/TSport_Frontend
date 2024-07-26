import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Accordion, AccordionItem, Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { faSoccerBall, faPersonRunning, faPeopleGroup, faTShirt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {/* <CompaniesDropdown /> */}
          <p className="text-3xl">TSport</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {/* <SidebarMenu title="Admin">
               <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="/admin/manage/accounts"
              />
              <SidebarItem
                isActive={pathname === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
               <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/manage/admin"}
              href="/manage/admin"
            /> 
               <SidebarItem
                isActive={pathname === "/manage/admin/accounts"}
                title="Khách hàng"
                icon={<CustomersIcon />}
                href="/manage/admin/accounts"
              />
               <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              />
            </SidebarMenu> */}

            <SidebarMenu title="">
              <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/manage/admin"}
              href="/manage/admin"
            />
              <SidebarItem
                isActive={pathname === "/manage/staff/tshirts"}
                title="T-Shirt"
                icon={<FontAwesomeIcon
                              icon={faTShirt}
                              className="text-white-500"
                            />}
                href="/manage/staff/tshirts"
              />
              <SidebarItem
                isActive={pathname === "/manage/staff/shirt-editions"}
                title="Phiên bản áo đấu"
                icon={<FontAwesomeIcon
                              icon={faTShirt}
                              className="text-white-500"
                            />}
                href="/manage/staff/shirt-editions"
              />
              <SidebarItem
                isActive={pathname === "/manage/staff/view-orders"}
                title="Đơn hàng"
                icon={<FontAwesomeIcon
                              icon={faShoppingCart}
                              className="text-white-500"
                            />}
                href="/manage/staff/view-orders"
              />
              <Accordion>
      <AccordionItem key="1" title="Quản lý" >
                <SidebarItem
                isActive={pathname === "/manage/staff/seasons"}
                title="Mùa giải"
                icon={<FontAwesomeIcon
                              icon={faSoccerBall}
                              className="text-black-500"
                            />}
                href="/manage/staff/seasons"
              />
              <SidebarItem
                isActive={pathname === "/manage/staff/clubs"}
                title="CLB"
                icon={<FontAwesomeIcon
                              icon={faPeopleGroup}
                              className="text-black-500"
                            />}
                href="/manage/staff/clubs"
              />
              <SidebarItem
                isActive={pathname === "/manage/staff/players"}
                title="Cầu thủ"
                icon={<FontAwesomeIcon
                              icon={faPersonRunning}
                              className="text-black-500"
                            />}
                href="/manage/staff/players"
              />
      </AccordionItem>
    </Accordion>
              {/* <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              /> */}
              {/* <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              /> */}
            </SidebarMenu>

            {/* <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu> */}
          </div>
          {/* <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div> */}
        </div>
      </div>
    </aside>
  );
};